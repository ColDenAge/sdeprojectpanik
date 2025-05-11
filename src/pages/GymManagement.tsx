import React, { useContext, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RoleContext } from "@/router/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Activity, Calendar, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Gym } from "@/components/gym-management/types/gymTypes";
import { initialGymsData } from "@/components/gym-management/data/mockData";
import MembersTab from "@/components/gym-management/MembersTab";
import AmenitiesTab from "@/components/gym-management/AmenitiesTab";
import ClassesTab from "@/components/gym-management/ClassesTab";
import { Badge } from "@/components/ui/badge";
import GymDialog from "@/components/gym-management/dialogs/GymDialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const GymManagement = () => {
  const { userRole } = useContext(RoleContext);
  const { user } = useAuth();
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [activeTab, setActiveTab] = useState("members");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gymToEdit, setGymToEdit] = useState<Gym | undefined>(undefined);
  const [totalClasses, setTotalClasses] = useState(0);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!user) return;
    const fetchGymsAndClasses = async () => {
      const gymsRef = collection(db, "gyms");
      const q = query(gymsRef, where("ownerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const gymsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gym));
      setGyms(gymsList);
      // Fetch all classes for these gyms
      let classCount = 0;
      for (let i = 0; i < gymsList.length; i++) {
        const gymId = gymsList[i].id;
        const classesRef = collection(db, "gyms", gymId, "classes");
        const classesSnapshot = await getDocs(classesRef);
        classCount += classesSnapshot.size;
      }
      setTotalClasses(classCount);
    };
    fetchGymsAndClasses();
  }, [user]);

  const handleAddGym = () => {
    setGymToEdit(undefined);
    setDialogOpen(true);
  };

  const handleEditGym = () => {
    setGymToEdit(selectedGym || undefined);
    setDialogOpen(true);
  };

  const handleSaveGym = async (values: { name: string; location: string; address: string; contactNumber: string }) => {
    if (gymToEdit) {
      await updateDoc(doc(db, "gyms", gymToEdit.id), values);
      // Refetch gyms from Firestore to update local state
      const gymsRef = collection(db, "gyms");
      const q = query(gymsRef, where("ownerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setGyms(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gym)));
      toast({
        title: "Gym Updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      if (!user) return;
      await addDoc(collection(db, "gyms"), {
        name: values.name,
        location: values.location,
        address: values.address,
        contactNumber: values.contactNumber,
        ownerId: user.uid,
        activeMembers: [],
        status: "Active",
        members: 0,
        pendingApplications: 0,
      });
      const gymsRef = collection(db, "gyms");
      const q = query(gymsRef, where("ownerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setGyms(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gym)));
      toast({
        title: "Gym Added",
        description: `${values.name} has been added successfully.`,
      });
    }
  };

  // Calculate total members from all gyms
  const totalMembers = gyms.reduce((sum, gym) => Array.isArray(gym.activeMembers) ? sum + gym.activeMembers.length : sum, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0B294B]">Gym Management</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search gyms..."
                className="pl-9 w-[300px]"
              />
            </div>
            <Button
              className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
              onClick={handleAddGym}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Gym
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gyms</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gyms.length}</div>
              <p className="text-xs text-muted-foreground">Active locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">{totalMembers === 0 ? '' : '+12% from last month'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">Across all locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Gym List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Gyms</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {gyms.map((gym) => (
                    <div
                      key={gym.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedGym?.id === gym.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedGym(gym)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{gym.name}</h3>
                          <p className="text-sm text-muted-foreground">{gym.location}</p>
                        </div>
                        <Badge variant="success">{gym.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {gym.members} members
                        </span>
                        {gym.pendingApplications > 0 && (
                          <span className="flex items-center gap-1 text-amber-600">
                            <Calendar className="h-4 w-4" />
                            {gym.pendingApplications} pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Gym Details */}
          <div className="lg:col-span-2">
            {selectedGym ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedGym.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedGym.location}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditGym}
                    >
                      Edit Gym Info
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="members" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="members">Members</TabsTrigger>
                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      <TabsTrigger value="classes">Classes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="members" className="mt-4">
                      <MembersTab gymId={selectedGym?.id} />
                    </TabsContent>
                    <TabsContent value="amenities" className="mt-4">
                      <AmenitiesTab gymId={selectedGym?.id} />
                    </TabsContent>
                    <TabsContent value="classes" className="mt-4">
                      <ClassesTab gymId={selectedGym?.id} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Select a gym to view details</p>
                    <p className="text-sm">Choose a gym from the list to see its members, amenities, and classes</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Gym Dialog */}
      <GymDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        gym={gymToEdit}
        onSave={handleSaveGym}
      />
    </DashboardLayout>
  );
};

export default GymManagement;