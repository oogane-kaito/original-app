import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DemoEditorPage from '@/components/demo/edit';
export default function Editor() {
    return (
        <>
         <Head title="Dashboard" />
         <DemoEditorPage />
        </>
           


          
    );
}