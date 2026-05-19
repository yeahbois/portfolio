const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function wipeAndPopulate() {
  console.log('Cleaning tables...');

  await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('public_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('blogs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Inserting Lorem Ipsum data...');

  await supabase.from('experience').insert([{
    company: 'Lorem Ipsum Corp',
    role: 'Lorem Ipsum Developer',
    period: 'Jan 2020 – Present',
    location: 'Remote',
    points: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
    order_index: 1
  }]);

  await supabase.from('projects').insert([{
    title: 'Lorem Project',
    description: 'Lorem ipsum dolor sit amet description',
    tech: ['Lorem', 'Ipsum'],
    href: 'https://github.com',
    points: ['Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
    order_index: 1
  }]);

  await supabase.from('skills').insert([{
    category: 'LOREM_SKILLS',
    items: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    order_index: 1
  }]);

  await supabase.from('public_projects').insert([{
    name: 'Lorem Public Project',
    description: 'Lorem ipsum short description',
    details: 'Lorem ipsum long details about the public project.',
    creator: 'Lorem Creator',
    status_percentage: 50,
    status_message: 'In Progress',
    order_index: 1
  }]);

  await supabase.from('blogs').insert([{
    title: 'Lorem Blog Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    order_index: 1
  }]);

  console.log('Done!');
}

wipeAndPopulate().catch(console.error);
