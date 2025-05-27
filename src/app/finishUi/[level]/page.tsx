"uee client"

import FinishUi from '@/components/finishui';
import { use } from 'react';

type FinishUiPageProps = {
  params: Promise<{ level: string }>
}

export default function FinishUiPage({ params }: FinishUiPageProps) {
    const { level } = use(params);
    return <FinishUi level={level} />;
}
