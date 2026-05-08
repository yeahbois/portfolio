import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello World!</h1>
      
      {/* 1. Show any Supabase errors (like RLS or missing table) */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffe6e6', color: 'red', borderRadius: '5px' }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {/* 2. Show a helpful message if the array is empty */}
      {todos?.length === 0 && (
        <p style={{ color: 'gray' }}>No todos found. (Is your table empty or is RLS blocking reads?)</p>
      )}

      {/* 3. The list of todos */}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.name ? todo.name : <span style={{color: 'red'}}>No "name" property found on this row!</span>}
          </li>
        ))}
      </ul>
      
      {/* 4. Show the raw JSON data so we can see exactly what came back */}
      <details style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Raw Database Response</summary>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </details>
    </div>
  )
}
