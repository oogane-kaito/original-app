import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EditorPage from '@/components/edit/main';
export default function Editor({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editor</h2>}
        >
            <Head title="Dashboard" />

            <EditorPage />
        </AuthenticatedLayout>
    );
}