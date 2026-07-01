import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        role: string;
        bio: string;
        order: string;
        photo: File | null;
    }>({
        name: '',
        role: '',
        bio: '',
        order: '',
        photo: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/board-members', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Add Board Member" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">Add Board Member</h1>

                    <form onSubmit={submit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order</label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('photo', e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full text-sm text-gray-700"
                            />
                            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link href='/board-members' className="text-sm text-gray-600 hover:text-gray-900">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}