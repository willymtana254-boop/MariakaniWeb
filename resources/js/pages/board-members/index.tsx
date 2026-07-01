import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

interface BoardMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo_path: string | null;
    order: number | null;
}

interface Props {
    boardMembers: BoardMember[];
}

export default function Index({ boardMembers }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this board member?')) {
            router.delete(`/board-members/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Board Members" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">Board Members</h1>
                        <Link
                            href='/board-members/create'
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                        >
                            Add Board Member
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Photo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {boardMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {member.photo_path ? (
                                                <img
                                                    src={`/storage/${member.photo_path}`}
                                                    alt={member.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200" />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {member.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{member.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{member.order}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                            <Link
                                                href={`/board-members/${member.id}/edit`}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {boardMembers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No board members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}