import { Head } from '@inertiajs/react';
import LpHeader from '@/components/common/lpHeader';
import LpFooter from '@/components/common/lpFooter';
import LpMain from '@/components/common/lpMain';
export default function Lp({ auth, laravelVersion, phpVersion }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-white">

            <Head title="デジタル名刺アプリ" />
            <LpHeader />
            <LpMain />
            <LpFooter />
        </div>
    );
}