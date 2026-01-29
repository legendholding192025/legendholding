import { createClient } from '@supabase/supabase-js';
import { generatePageMetadata } from '@/config/metadata';

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<ReturnType<typeof generatePageMetadata>> {
  const { id } = await props.params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return generatePageMetadata({
      title: 'Job Opening',
      description:
        'Explore career opportunities at Legend Holding Group. Join our dynamic team and contribute to innovation across the Middle East.',
      keywords:
        'Legend Holding Group jobs, career opportunities, UAE employment, Middle East careers',
      imageUrl: 'https://www.legendholding.com/images/url_logo.png',
    });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );

  const { data: job } = await supabaseAdmin
    .from('jobs')
    .select('title')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  const title = job?.title ? `${job.title}` : 'Job Opening';
  return generatePageMetadata({
    title,
    description:
      'Explore career opportunities at Legend Holding Group. Join our dynamic team and contribute to innovation across the Middle East.',
    keywords:
      'Legend Holding Group jobs, career opportunities, UAE employment, Middle East careers',
    imageUrl: 'https://www.legendholding.com/images/url_logo.png',
  });
}

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
