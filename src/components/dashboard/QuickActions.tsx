
import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const QuickActions: React.FC = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    action: () => {}
  });

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const openDialog = (title: string, description: string, action: () => void) => {
    setDialogContent({ title, description, action });
    setDialogOpen(true);
  };

  const handleActionConfirm = () => {
    dialogContent.action();
    setDialogOpen(false);
  };

  const showToast = (title: string, description: string) => {
    toast({
      title,
      description
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-[#0B294B]">
          {userRole === "member" ? "Quick Links" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {userRole === "member" ? (
            <>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Book a Class
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                View Schedule
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Update Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Track Progress
              </button>
              <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Contact Support
              </button>
            </>
          ) : (
            <>
              <button 
                className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => openDialog(
                  "Add New Class",
                  "Create a new fitness class for your gym locations",
                  () => handleNavigation("/gyms")
                )}
              >
                Add New Class
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => handleNavigation("/gyms")}
              >
                Manage Members
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => openDialog(
                  "Schedule Trainers",
                  "Manage your trainers' schedules and assignments",
                  () => showToast("Trainers Scheduled", "Your trainer scheduling request has been processed.")
                )}
              >
                View Reports
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => handleNavigation("/billings")}
              >
                Billing & Payments
              </button>
            </>
          )}
        </div>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleActionConfirm}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QuickActions;
