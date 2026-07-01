import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

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

export default function Show({ boardMember }: Props) {
    return (
        <AppLayout>
            <Head title={boardMember.name} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Link href='/board-members' className="mb-6 inline-block text-sm text-indigo-600 hover:text-indigo-900">
                        &larr; Back to Board Members
                    </Link>

                    <div className="rounded-lg bg-white p-6 shadow">
                        {boardMember.photo_path && (
                            <img
                                src={`/storage/${boardMember.photo_path}`}
                                alt={boardMember.name}
                                className="mb-4 h-32 w-32 rounded-full object-cover"
                            />
                        )}

                        <h1 className="text-2xl font-semibold text-gray-900">{boardMember.name}</h1>
                        <p className="mt-1 text-sm text-gray-500">{boardMember.role}</p>

                        {boardMember.bio && <p className="mt-4 text-gray-700">{boardMember.bio}</p>}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}