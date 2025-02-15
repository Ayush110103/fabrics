import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Invite {
    email: string;
    role: 'viewer' | 'admin';
}

interface InviteModalProps {
    onClose: () => void;
    userEmail: string; // pass the current user's email from Header.tsx if needed
}

const InviteModal: React.FC<InviteModalProps> = ({ onClose, userEmail }) => {
    const [invites, setInvites] = useState<Invite[]>([{ email: '', role: 'viewer' }]);
    const [sending, setSending] = useState(false);

    const handleInviteChange = (index: number, field: 'email' | 'role', value: string) => {
        const newInvites = [...invites];
        newInvites[index] = { ...newInvites[index], [field]: value };
        setInvites(newInvites);
    };

    const addInviteField = () => {
        setInvites([...invites, { email: '', role: 'viewer' }]);
    };

    const handleSendInvites = async () => {
        setSending(true);
        try {
            const response = await fetch('/api/send-invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invites, userEmail })
            });
            if (!response.ok) {
                console.error('Failed to send invites');
            }
        } catch (error) {
            console.error(error);
        }
        setSending(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">Send Invites</h2>
                {invites.map((invite, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={invite.email}
                            onChange={(e) => handleInviteChange(index, 'email', e.target.value)}
                            className="border p-1 flex-1"
                        />
                        <select
                            value={invite.role}
                            onChange={(e) =>
                                handleInviteChange(index, 'role', e.target.value)
                            }
                            className="border p-1"
                        >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                ))}
                <Button onClick={addInviteField} className="mb-4">
                    Add Another
                </Button>
                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} className="bg-gray-400">
                        Cancel
                    </Button>
                    <Button onClick={handleSendInvites} disabled={sending}>
                        {sending ? 'Sending...' : 'Send Invite'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InviteModal;