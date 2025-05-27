"uee client"

import FinishUi from '@/components/finishui';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ level: string }> }) {
    const { level } = use(params);
    return <FinishUi level={level} />;
}
