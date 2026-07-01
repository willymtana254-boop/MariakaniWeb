import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface BoardMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo_path: string | null;
    order: number | null;
}

interface Props {
    boardMember: BoardMember;
}

export default function Edit({ boardMember }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        role: string;
        bio: string;
        order: string;
        photo: File | null;
        _method: string;
    }>({
        name: boardMember.name,
        role: boardMember.role,
        bio: boardMember.bio ?? '',
        order: boardMember.order?.toString() ?? '',
        photo: null,
        _method: 'put',
    });

    // Using POST + _method spoofing since PHP can't parse multipart on PUT/PATCH
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/board-members/${boardMember.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit ${boardMember.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">Edit Board Member</h1>

                    {boardMember.photo_path && (
                        <img
                            src={`/storage/${boardMember.photo_path}`}
                            alt={boardMember.name}
                            className="mb-4 h-20 w-20 rounded-full object-cover"
                        />
                    )}

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
                            <label className="block text-sm font-medium text-gray-700">
                                Photo {boardMember.photo_path && '(leave blank to keep current)'}
                            </label>
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}