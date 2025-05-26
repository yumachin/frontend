"uee client"

import FinishUi from '@/components/finishUi';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ level: string }> }) {
    const { level } = use(params);
    return <FinishUi level={level} />;
}
