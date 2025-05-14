import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { ApplicationModal } from './ApplicationModal';
import { Member } from '../types';

interface MembersTabProps {
  members: Member[];
  gymId: string;
  onMemberUpdate: () => void;
}

export const MembersTab = ({ members, gymId, onMemberUpdate }: MembersTabProps) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusClick = (member: Member) => {
    if (member.status === 'pending') {
      setSelectedMember(member);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Button
                  variant={member.status === 'pending' ? 'secondary' : 'ghost'}
                  onClick={() => handleStatusClick(member)}
                  className={member.status === 'pending' ? 'cursor-pointer' : ''}
                >
                  {member.status}
                </Button>
              </TableCell>
              <TableCell>
                {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedMember && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          memberId={selectedMember.id}
          gymId={gymId}
          memberName={selectedMember.name}
          onSuccess={onMemberUpdate}
        />
      )}
    </div>
  );
}; 