import AppPageShell from '@/components/app-page-shell';
import PageLoader from '@/components/page-loader';

/** Route loading state — shell stays mounted, spinner owns the content section. */
export default function RootLoading() {
  return (
    <AppPageShell>
      <PageLoader />
    </AppPageShell>
  );
}
