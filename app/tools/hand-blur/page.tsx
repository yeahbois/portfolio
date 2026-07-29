'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// Andrew's Monotone Chain Convex Hull algorithm
interface Point {
  x: number
  y: number
}

function crossProduct(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
}

function getConvexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y))
  if (sorted.length <= 1) return sorted

  const lower: Point[] = []
  for (let i = 0; i < sorted.length; i++) {
    while (
      lower.length >= 2 &&
      crossProduct(lower[lower.length - 2], lower[lower.length - 1], sorted[i]) <= 0
    ) {
      lower.pop()
    }
    lower.push(sorted[i])
  }

  const upper: Point[] = []
  for (let i = sorted.length - 1; i >= 0; i--) {
    while (
      upper.length >= 2 &&
      crossProduct(upper[upper.length - 2], upper[upper.length - 1], sorted[i]) <= 0
    ) {
      upper.pop()
    }
    upper.push(sorted[i])
  }

  lower.pop()
  upper.pop()
  return lower.concat(upper)
}

// Hand skeleton connections mapping
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // Index
  [5, 9], [9, 10], [10, 11], [11, 12], // Middle
  [9, 13], [13, 14], [14, 15], [15, 16], // Ring
  [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
  [0, 17] // Palm base connection
]

export default function HandBlurTool() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const detectorRef = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // State Management
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [peaceDetected, setPeaceDetected] = useState(false)
  const [detectedHandsCount, setDetectedHandsCount] = useState(0)

  // Customization Options
  const [blurMode, setBlurMode] = useState<'entire' | 'hand' | 'background' | 'none'>('entire')
  const [blurRadius, setBlurRadius] = useState(40)
  const [minConfidence, setMinConfidence] = useState(0.5)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [maxHands, setMaxHands] = useState(1)

  // Initialize MediaPipe model
  useEffect(() => {
    let active = true

    async function initMediaPipe() {
      try {
        setIsModelLoading(true)
        setErrorMsg('')

        // Dynamically import to prevent SSR failure
        const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')

        const localWasm = typeof window !== 'undefined'
          ? window.location.origin + '/wasm'
          : '/wasm'
        const cdnWasm = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.0/wasm'

        let vision = null

        // Load WebAssembly files (Local first, then CDN fallback)
        try {
          console.log('MediaPipe: Initializing local WebAssembly from:', localWasm)
          vision = await FilesetResolver.forVisionTasks(localWasm)
          console.log('MediaPipe: Local WebAssembly files successfully loaded.')
        } catch (localWasmErr: any) {
          console.warn('MediaPipe: Local WebAssembly initialization failed. Falling back to CDN. Error:', localWasmErr?.message || localWasmErr)
          try {
            console.log('MediaPipe: Initializing CDN WebAssembly from:', cdnWasm)
            vision = await FilesetResolver.forVisionTasks(cdnWasm)
            console.log('MediaPipe: CDN WebAssembly files successfully loaded.')
          } catch (cdnWasmErr: any) {
            console.error('MediaPipe: CDN WebAssembly initialization failed.')
            throw cdnWasmErr
          }
        }

        if (!active || !vision) return

        // Resolve absolute URL for the local model asset to prevent relative resolution issues in WASM loader
        const localModelUrl = typeof window !== 'undefined'
          ? window.location.origin + '/hand_landmarker.task'
          : '/hand_landmarker.task'

        let landmarker = null

        // --- Multi-stage Robust Model Loader Pipeline ---

        // Stage 1: Try Local Model + GPU
        try {
          console.log('MediaPipe Stage 1: Attempting Local Model + GPU...')
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: localModelUrl,
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: maxHands,
            minHandDetectionConfidence: minConfidence,
            minHandPresenceConfidence: minConfidence,
            minTrackingConfidence: minConfidence
          })
          console.log('MediaPipe Stage 1 Succeeded: Local Model + GPU loaded.')
        } catch (stage1Err: any) {
          console.warn('MediaPipe Stage 1 Failed (Local Model + GPU). Error details:', stage1Err?.message || stage1Err)

          // Stage 2: Try Local Model + CPU
          try {
            console.log('MediaPipe Stage 2: Attempting Local Model + CPU...')
            landmarker = await HandLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: localModelUrl,
                delegate: 'CPU',
              },
              runningMode: 'VIDEO',
              numHands: maxHands,
              minHandDetectionConfidence: minConfidence,
              minHandPresenceConfidence: minConfidence,
              minTrackingConfidence: minConfidence
            })
            console.log('MediaPipe Stage 2 Succeeded: Local Model + CPU loaded.')
          } catch (stage2Err: any) {
            console.warn('MediaPipe Stage 2 Failed (Local Model + CPU). Error details:', stage2Err?.message || stage2Err)

            // Stage 3: Try CDN Model + GPU
            try {
              console.log('MediaPipe Stage 3: Attempting CDN Model + GPU...')
              landmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                  modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
                  delegate: 'GPU',
                },
                runningMode: 'VIDEO',
                numHands: maxHands,
                minHandDetectionConfidence: minConfidence,
                minHandPresenceConfidence: minConfidence,
                minTrackingConfidence: minConfidence
              })
              console.log('MediaPipe Stage 3 Succeeded: CDN Model + GPU loaded.')
            } catch (stage3Err: any) {
              console.warn('MediaPipe Stage 3 Failed (CDN Model + GPU). Error details:', stage3Err?.message || stage3Err)

              // Stage 4: Try CDN Model + CPU (Final Fallback)
              try {
                console.log('MediaPipe Stage 4: Attempting CDN Model + CPU (Final Fallback)...')
                landmarker = await HandLandmarker.createFromOptions(vision, {
                  baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
                    delegate: 'CPU',
                  },
                  runningMode: 'VIDEO',
                  numHands: maxHands,
                  minHandDetectionConfidence: minConfidence,
                  minHandPresenceConfidence: minConfidence,
                  minTrackingConfidence: minConfidence
                })
                console.log('MediaPipe Stage 4 Succeeded: CDN Model + CPU loaded.')
              } catch (stage4Err: any) {
                console.error('MediaPipe Stage 4 Failed (CDN Model + CPU).')
                throw stage4Err
              }
            }
          }
        }

        if (active && landmarker) {
          detectorRef.current = landmarker
          setIsModelLoading(false)
        }
      } catch (err: any) {
        console.error('All MediaPipe initialization attempts failed.', err)
        if (active) {
          // If the error object is an Event (like a resource load failure), display a readable message
          const readableError = err instanceof Event ? 'Failed to fetch model resources (Network/CORS/Blocked)' : (err?.message || String(err))
          setErrorMsg(`MODEL_INIT_ERROR: ${readableError}`)
          setIsModelLoading(false)
        }
      }
    }

    initMediaPipe()

    return () => {
      active = false
      if (detectorRef.current) {
        detectorRef.current.close()
        detectorRef.current = null
      }
    }
  }, [minConfidence, maxHands])

  // Start Webcam
  const startCamera = async () => {
    setErrorMsg('')
    try {
      if (streamRef.current) {
        stopCamera()
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setIsWebcamActive(true)
        }
      }
    } catch (err: any) {
      console.error('Webcam activation failed:', err)
      let customMsg = `WEBCAM_ERROR: ${err.message || 'Permission denied'}`

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        customMsg = 'WEBCAM_ACCESS_DENIED: Please click the site settings/lock icon in your browser address bar and grant camera permissions for this page.'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        customMsg = 'WEBCAM_NOT_FOUND: No camera device was detected on your system. Please verify that your webcam is connected.'
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        customMsg = 'WEBCAM_IN_USE: The camera is currently locked by another application (e.g. Zoom, Teams, OBS, or another open browser tab).'
      }

      setErrorMsg(customMsg)
    }
  }

  // Stop Webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsWebcamActive(false)
    setPeaceDetected(false)
    setDetectedHandsCount(0)
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
    }

    // Clear canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  // Effect to manage starting and stopping camera
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Main processing loop
  useEffect(() => {
    if (!isWebcamActive || !videoRef.current || !canvasRef.current || !detectorRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx) return

    const loop = () => {
      if (video.paused || video.ended) {
        requestRef.current = requestAnimationFrame(loop)
        return
      }

      if (video.readyState >= 2) {
        const width = video.videoWidth
        const height = video.videoHeight

        if (!width || !height) {
          requestRef.current = requestAnimationFrame(loop)
          return
        }

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }

        const currentDetector = detectorRef.current
        if (!currentDetector) {
          requestRef.current = requestAnimationFrame(loop)
          return
        }

        // Run hand detection safely
        const timestamp = performance.now()
        let results = null
        try {
          results = currentDetector.detectForVideo(video, timestamp)
        } catch (err) {
          console.error('MediaPipe detection failed for frame:', err)
          requestRef.current = requestAnimationFrame(loop)
          return
        }

        if (!results) {
          requestRef.current = requestAnimationFrame(loop)
          return
        }

        setDetectedHandsCount(results.landmarks ? results.landmarks.length : 0)

        // Gesture rule validation helper (identical to Python code)
        // returns y(tip) < y(pip)
        const isFingerUp = (tip: number, pip: number, landmarks: any) => {
          return landmarks[tip].y < landmarks[pip].y
        }

        const checkPeaceSign = (landmarks: any) => {
          const indexUp = isFingerUp(8, 6, landmarks)
          const middleUp = isFingerUp(12, 10, landmarks)
          const ringUp = isFingerUp(16, 14, landmarks)
          const pinkyUp = isFingerUp(20, 18, landmarks)

          // Index and Middle are up, Ring and Pinky are down (Matches Python)
          return indexUp && middleUp && !ringUp && !pinkyUp
        }

        let isPeaceActive = false
        if (results.landmarks && results.landmarks.length > 0) {
          for (const landmarks of results.landmarks) {
            if (checkPeaceSign(landmarks)) {
              isPeaceActive = true
              break
            }
          }
        }
        setPeaceDetected(isPeaceActive)

        // Rendering logic
        ctx.clearRect(0, 0, width, height)

        const drawMirrorFrame = (context: CanvasRenderingContext2D, filterStr: string = 'none') => {
          context.save()
          // Mirror horizontal flip
          context.translate(width, 0)
          context.scale(-1, 1)
          context.filter = filterStr
          context.drawImage(video, 0, 0, width, height)
          context.restore()
        }

        // 1. Render base video frame according to Blur Mode
        const entireScreenBlurActive = blurMode === 'entire' && isPeaceActive

        if (entireScreenBlurActive) {
          drawMirrorFrame(ctx, `blur(${blurRadius}px)`)
        } else if (blurMode === 'background' && results.landmarks && results.landmarks.length > 0) {
          // Draw blurred background
          drawMirrorFrame(ctx, `blur(${blurRadius}px)`)
        } else {
          // Normal base frame
          drawMirrorFrame(ctx, 'none')
        }

        // 2. Draw Hand-specific mask clipping if requested
        if (results.landmarks && results.landmarks.length > 0) {
          results.landmarks.forEach((landmarks: any) => {
            const hasPeace = checkPeaceSign(landmarks)

            // Dynamic convex hull mapping of landmarks
            const pts: Point[] = landmarks.map((l: any) => ({
              // Convert mirrored horizontal coordinates
              x: (1 - l.x) * width,
              y: l.y * height
            }))
            const hull = getConvexHull(pts)

            // Apply Selective Blurring Masks
            if (blurMode === 'hand') {
              // Blur only the hand: Draw unblurred frame, clip hand region, and draw blurred frame inside
              ctx.save()
              ctx.beginPath()
              if (hull.length > 0) {
                ctx.moveTo(hull[0].x, hull[0].y)
                for (let i = 1; i < hull.length; i++) {
                  ctx.lineTo(hull[i].x, hull[i].y)
                }
              }
              ctx.closePath()
              ctx.clip()

              // Draw blurred frame over hand area
              drawMirrorFrame(ctx, `blur(${blurRadius}px)`)
              ctx.restore()
            } else if (blurMode === 'background') {
              // Background blurred: Draw unblurred hand on top of blurred background
              ctx.save()
              ctx.beginPath()
              if (hull.length > 0) {
                ctx.moveTo(hull[0].x, hull[0].y)
                for (let i = 1; i < hull.length; i++) {
                  ctx.lineTo(hull[i].x, hull[i].y)
                }
              }
              ctx.closePath()
              ctx.clip()

              // Draw unblurred frame inside clipped hand area
              drawMirrorFrame(ctx, 'none')
              ctx.restore()
            }

            // 3. Draw Skeletons overlay if enabled
            if (showSkeleton) {
              // Set neon colors depending on gesture state
              const strokeColor = hasPeace ? '#00ffcc' : '#00ff44' // Teal-cyan for peace, Lime green for tracking
              const nodeColor = hasPeace ? '#ff0055' : '#ff00bb'  // Hot pink for peace, Neon purple for tracking

              // Draw skeleton connections
              ctx.strokeStyle = strokeColor
              ctx.lineWidth = 3
              ctx.shadowBlur = 4
              ctx.shadowColor = strokeColor

              HAND_CONNECTIONS.forEach(([start, end]) => {
                const p1 = landmarks[start]
                const p2 = landmarks[end]

                ctx.beginPath()
                ctx.moveTo((1 - p1.x) * width, p1.y * height)
                ctx.lineTo((1 - p2.x) * width, p2.y * height)
                ctx.stroke()
              })

              // Draw joint nodes
              ctx.shadowColor = nodeColor
              landmarks.forEach((landmark: any) => {
                ctx.beginPath()
                ctx.arc((1 - landmark.x) * width, landmark.y * height, 5, 0, 2 * Math.PI)
                ctx.fillStyle = nodeColor
                ctx.fill()
              })

              // Draw bounding box / overlay text
              ctx.shadowBlur = 0 // Reset shadow
              const xs = pts.map(p => p.x)
              const ys = pts.map(p => p.y)
              const minX = Math.min(...xs)
              const maxX = Math.max(...xs)
              const minY = Math.min(...ys)
              const maxY = Math.max(...ys)

              ctx.strokeStyle = hasPeace ? '#00ffcc' : 'rgba(255,255,255,0.3)'
              ctx.lineWidth = 1
              ctx.strokeRect(minX - 15, minY - 15, (maxX - minX) + 30, (maxY - minY) + 30)

              // HUD Hand Info Label
              ctx.font = '9px monospace'
              ctx.fillStyle = hasPeace ? '#00ffcc' : '#ffffff'
              ctx.fillText(
                `${hasPeace ? 'PEACE_SIGN_GESTURE' : 'TRACKING_HAND'} [x:${Math.round(pts[0].x)}, y:${Math.round(pts[0].y)}]`,
                minX - 15,
                minY - 22
              )
            }
          })
        }
      }

      requestRef.current = requestAnimationFrame(loop)
    }

    requestRef.current = requestAnimationFrame(loop)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isWebcamActive, blurMode, blurRadius, showSkeleton])

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-outline/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-[10px] uppercase border border-outline/20 px-2 py-0.5 hover:bg-primary hover:text-on-primary hover:border-primary transition-all">
                &lt; BACK
              </Link>
              <span className="text-[10px] opacity-35 font-mono">SYSTEM_TOOLS //</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase glitch-effect mt-2">
              PEACE_BLUR_DETECTOR_v1.0
            </h1>
            <p className="text-[10px] opacity-50 mt-1 tracking-widest uppercase">
              Webcam-based gesture tracker. Blurs feed dynamically upon detecting peace gestures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isWebcamActive ? (
              <button
                onClick={stopCamera}
                className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2.5 text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all uppercase font-bold animate-pulse"
              >
                DEACTIVATE_CAM.EXE
              </button>
            ) : (
              <button
                onClick={startCamera}
                disabled={isModelLoading}
                className="bg-primary text-on-primary px-6 py-2.5 text-[10px] tracking-widest hover:opacity-90 disabled:opacity-50 transition-all uppercase font-bold"
              >
                ACTIVATE_CAM.EXE
              </button>
            )}
          </div>
        </header>

        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono mb-6 ascii-border">
            [SYSTEM_FAILURE]: {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CAMERA RUNTIME VIEWER */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="ascii-border p-2 bg-surface/10 aspect-video relative flex items-center justify-center overflow-hidden border border-outline/20">
              {/* Hidden Video element to pipe into Canvas */}
              <video
                ref={videoRef}
                className="hidden"
                playsInline
                muted
                width="640"
                height="480"
              />

              {/* Display Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain bg-black/90 grayscale-0 transition-all duration-300"
              />

              {/* Overlay states */}
              {!isWebcamActive && (
                <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="text-4xl mb-4 font-bold opacity-20">[_O_]</div>
                  <h3 className="font-bold text-sm tracking-wide uppercase mb-2">SYSTEM_STANDBY</h3>
                  <p className="text-[10px] text-on-surface/60 max-w-sm uppercase leading-relaxed mb-6">
                    Activate the webcam module above to initialize tracking pipeline. All processing runs local-only.
                  </p>
                  <button
                    onClick={startCamera}
                    disabled={isModelLoading}
                    className="border border-outline/30 px-6 py-2 text-[10px] tracking-widest hover:bg-foreground hover:text-background transition-all uppercase font-bold"
                  >
                    Initialize_Stream
                  </button>
                </div>
              )}

              {isModelLoading && (
                <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center p-6 text-center">
                  <div className="animate-spin text-lg mb-2">/</div>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">
                    DOWNLOADING_MODEL_ASSETS_INTO_BROWSER...
                  </span>
                  <span className="text-[8px] opacity-40 uppercase tracking-tighter mt-1">
                    Loading MediaPipe Hand Landmarker runtime (float16)
                  </span>
                </div>
              )}

              {/* Dynamic HUD Indicator */}
              {isWebcamActive && (
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none select-none">
                  <div className="bg-background/85 border border-outline/20 px-3 py-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[9px] font-bold text-emerald-400">CAM_FEED: ACTIVE</span>
                  </div>

                  <div className="bg-background/85 border border-outline/20 px-3 py-1.5 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-foreground">
                      HANDS_IN_VIEW: {detectedHandsCount}
                    </span>
                  </div>
                </div>
              )}

              {/* Peace Sign Detected Alert
              {isWebcamActive && peaceDetected && (
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none select-none animate-pulse">
                  <div className="bg-red-500/90 text-white border border-red-500 px-4 py-2.5 text-center flex items-center justify-center gap-2">
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      ⚠️ ALERT: PEACE_GESTURE_DETECTED - BLURRING_ACTIVE
                    </span>
                  </div>
                </div>
              )} */}
            </div>

            <div className="mt-4 border border-outline/10 p-4 bg-surface/5">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2 text-primary">HOW_IT_WORKS.log</h4>
              <p className="text-[10px] text-on-surface/80 leading-relaxed uppercase">
                The application analyzes the video feed using Google MediaPipe Hand Landmarker WebAssembly.
                The gesture is matched using Python-identical logic: Index and Middle fingers pointing upward, while Ring and Pinky fingers remain closed.
              </p>
            </div>
          </div>

          {/* CONTROLS & CALIBRATION PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ascii-border p-6 bg-surface/30 space-y-6">
              <h2 className="text-sm font-bold tracking-widest uppercase border-b border-outline/20 pb-3 flex justify-between items-center">
                <span>CONFIG_CONTROLS</span>
                <span className="text-[8px] opacity-40 font-mono">v1.0.0</span>
              </h2>

              {/* BLUR MODE CONFIG */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest opacity-50 block">BLUR_MODE</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBlurMode('entire')}
                    className={`p-2 border text-[9px] font-mono tracking-tighter uppercase transition-colors text-left flex flex-col justify-between h-16 ${blurMode === 'entire'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-outline/20 hover:bg-surface text-on-surface/70'
                      }`}
                  >
                    <span>01. ENTIRE_SCREEN</span>
                    <span className="text-[8px] opacity-50 block lowercase">on peace gesture (Python default)</span>
                  </button>

                  <button
                    onClick={() => setBlurMode('hand')}
                    className={`p-2 border text-[9px] font-mono tracking-tighter uppercase transition-colors text-left flex flex-col justify-between h-16 ${blurMode === 'hand'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-outline/20 hover:bg-surface text-on-surface/70'
                      }`}
                  >
                    <span>02. HAND_ONLY</span>
                    <span className="text-[8px] opacity-50 block lowercase">blurs hand shape dynamically</span>
                  </button>

                  <button
                    onClick={() => setBlurMode('background')}
                    className={`p-2 border text-[9px] font-mono tracking-tighter uppercase transition-colors text-left flex flex-col justify-between h-16 ${blurMode === 'background'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-outline/20 hover:bg-surface text-on-surface/70'
                      }`}
                  >
                    <span>03. BACKGROUND_ONLY</span>
                    <span className="text-[8px] opacity-50 block lowercase">blurs screen except the hand</span>
                  </button>

                  <button
                    onClick={() => setBlurMode('none')}
                    className={`p-2 border text-[9px] font-mono tracking-tighter uppercase transition-colors text-left flex flex-col justify-between h-16 ${blurMode === 'none'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-outline/20 hover:bg-surface text-on-surface/70'
                      }`}
                  >
                    <span>04. TRACK_ONLY</span>
                    <span className="text-[8px] opacity-50 block lowercase">no blurring, just hand outlines</span>
                  </button>
                </div>
              </div>

              {/* SLIDERS & PARAMETERS */}
              <div className="space-y-4 pt-4 border-t border-outline/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="uppercase tracking-widest opacity-50">BLUR_INTENSITY</span>
                    <span className="font-bold">{blurRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={blurRadius}
                    onChange={(e) => setBlurRadius(Number(e.target.value))}
                    className="w-full accent-primary bg-background/50 h-1 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="uppercase tracking-widest opacity-50">MIN_DETECTION_CONFIDENCE</span>
                    <span className="font-bold">{minConfidence}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="0.9"
                    step="0.05"
                    value={minConfidence}
                    onChange={(e) => setMinConfidence(Number(e.target.value))}
                    className="w-full accent-primary bg-background/50 h-1 cursor-pointer"
                  />
                  <span className="text-[8px] opacity-40 uppercase block">
                    Higher values reduce false triggers but require good lighting.
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="uppercase tracking-widest opacity-50">MAX_TRACKABLE_HANDS</span>
                    <span className="font-bold">{maxHands}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setMaxHands(num)}
                        className={`flex-1 py-1 text-[10px] border ${maxHands === num ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-outline/20 text-on-surface/60 font-medium'
                          }`}
                      >
                        {num} HAND{num > 1 ? 'S' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* OVERLAY SWITCHES */}
              <div className="space-y-3 pt-4 border-t border-outline/10">
                <span className="text-[10px] uppercase tracking-widest opacity-50 block">OVERLAY_RENDERS</span>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showSkeleton}
                    onChange={(e) => setShowSkeleton(e.target.checked)}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[10px] uppercase tracking-wider">DRAW_SKELETON_HUD_LINES</span>
                </label>
              </div>
            </div>

            {/* TECHNICAL SPECS CARD */}
            <div className="border border-outline/10 p-6 bg-surface/5 font-mono text-[9px] uppercase space-y-2 text-on-surface/60">
              <div className="text-[10px] font-bold text-foreground mb-3 tracking-widest">LANDMARK_MAPPING_SPECS</div>
              <div className="flex justify-between border-b border-outline/5 pb-1">
                <span>GESTURE_RULE:</span>
                <span className="text-foreground font-bold">INDEX(8)&gt;PIP(6) &amp; MID(12)&gt;PIP(10)</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-1">
                <span>CLOSED_RULE:</span>
                <span className="text-foreground font-bold">RING(16)&lt;PIP(14) &amp; PINKY(20)&lt;PIP(18)</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-1">
                <span>ENGINE:</span>
                <span className="text-foreground">MEDIAPIPE TASKS VISION v0.10.8</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-1">
                <span>RENDERER:</span>
                <span className="text-foreground">HTML5 CANVAS 2D CONTEXT</span>
              </div>
              <div className="flex justify-between border-b border-outline/5 pb-1">
                <span>HARDWARE_ACCEL:</span>
                <span className="text-foreground">GPU (WEBGL DELEGATE)</span>
              </div>
              <div className="pt-2 text-[8px] opacity-40 leading-relaxed italic">
                GESTURE TRACING MATCHES TARGET PYTHON SCRIPT IMPLEMENTED IN OPENCV FOR HIGH COMPATIBILITY.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
