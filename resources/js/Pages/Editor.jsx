import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EditorPage from '@/components/edit/main';
export default function Editor() {
    return (
        <
        >
            <Head title="Dashboard" />

            <EditorPage />
        </>
    );
}