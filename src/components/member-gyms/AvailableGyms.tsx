
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, MapPin, CalendarIcon, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for available gyms
const availableGyms = [
  {
    id: 1,
    name: "FitLife Downtown",
    location: "123 Main St, Downtown",
    amenities: ["Pool", "Sauna", "24/7 Access", "Towel Service", "Locker Rooms"],
    membershipOptions: [
      { id: 1, name: "Standard", price: "$29.99/mo" },
      { id: 2, name: "Premium", price: "$49.99/mo" },
      { id: 3, name: "Premium Plus", price: "$69.99/mo" }
    ],
    classes: [
      { id: 1, name: "Yoga Basics", instructor: "Sarah Johnson", schedule: "Mon, Wed, Fri 6:00 PM", capacity: 20, enrolled: 15 },
      { id: 2, name: "HIIT Training", instructor: "Mike Thompson", schedule: "Tue, Thu 7:30 AM", capacity: 15, enrolled: 10 },
      { id: 3, name: "Spin Class", instructor: "Emily Davis", schedule: "Mon, Wed 5:30 PM", capacity: 25, enrolled: 20 }
    ]
  },
  {
    id: 2,
    name: "Elite Fitness Center",
    location: "456 Park Ave, Westside",
    amenities: ["Classes", "Personal Training", "Nutrition Counseling", "Protein Bar", "Massage Services"],
    membershipOptions: [
      { id: 1, name: "Basic", price: "$19.99/mo" },
      { id: 2, name: "Standard", price: "$39.99/mo" },
      { id: 3, name: "Premium", price: "$59.99/mo" }
    ],
    classes: [
      { id: 1, name: "CrossFit", instructor: "Chris Miller", schedule: "Mon, Wed, Fri 7:00 PM", capacity: 12, enrolled: 8 },
      { id: 2, name: "Pilates", instructor: "Lisa Wong", schedule: "Tue, Thu 9:00 AM", capacity: 15, enrolled: 12 }
    ]
  },
  {
    id: 3,
    name: "PowerLift Gym",
    location: "789 Strong Blvd, Eastside",
    amenities: ["Weightlifting", "Powerlifting Equipment", "Protein Bar", "24/7 Access", "Chalk Station"],
    membershipOptions: [
      { id: 1, name: "Monthly", price: "$34.99/mo" },
      { id: 2, name: "Quarterly", price: "$29.99/mo (billed quarterly)" },
      { id: 3, name: "Annual", price: "$24.99/mo (billed annually)" }
    ],
    classes: [
      { id: 1, name: "Powerlifting 101", instructor: "Mark Strong", schedule: "Mon, Wed 8:00 PM", capacity: 10, enrolled: 5 },
      { id: 2, name: "Olympic Lifting", instructor: "Jen Taylor", schedule: "Tue, Thu 6:30 PM", capacity: 8, enrolled: 6 }
    ]
  }
];

const AvailableGyms = () => {
  const [selectedGym, setSelectedGym] = useState<null | typeof availableGyms[0]>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<null | any>(null);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<null | any>(null);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState<number[]>([]);
  const { toast } = useToast();

  const handleViewDetails = (gym: typeof availableGyms[0]) => {
    setSelectedGym(gym);
    setIsDialogOpen(true);
  };

  const handleEnrollClass = (gymClass: any) => {
    setSelectedClass(gymClass);
    setEnrollDialogOpen(true);
  };

  const confirmEnrollment = () => {
    toast({
      title: "Enrolled Successfully",
      description: `You have been enrolled in ${selectedClass?.name} class.`,
    });
    setEnrollDialogOpen(false);
  };

  const handleSelectMembership = (membership: any) => {
    setSelectedMembership(membership);
    setMembershipDialogOpen(true);
  };

  const confirmMembership = () => {
    if (selectedGym) {
      toast({
        title: "Membership Application Submitted",
        description: `Your application for ${selectedMembership?.name} membership at ${selectedGym.name} has been submitted successfully.`,
      });
      setApplicationSuccess([...applicationSuccess, selectedGym.id]);
    }
    setMembershipDialogOpen(false);
    setIsDialogOpen(false);
  };

  const hasApplied = (gymId: number) => {
    return applicationSuccess.includes(gymId);
  };

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Explore Available Gyms
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGyms.map((gym) => (
            <Card key={gym.id} className="overflow-hidden border border-border">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{gym.name}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {gym.location}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">AMENITIES</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {gym.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">MEMBERSHIP OPTIONS</p>
                    <p className="text-sm">{gym.membershipOptions.map(m => m.name).join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">CLASSES</p>
                    <p className="text-sm">{gym.classes.length} classes available</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  {hasApplied(gym.id) ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Application Submitted
                    </div>
                  ) : (
                    <Button 
                      variant="default" 
                      className="bg-[#0B294B] hover:bg-[#0a2544] text-white"
                      onClick={() => {
                        setSelectedGym(gym);
                        setMembershipDialogOpen(true);
                      }}
                    >
                      Apply for Membership
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewDetails(gym)}
                    className="text-[#0B294B] hover:bg-[#0B294B]/10"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Gym Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedGym?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedGym && (
            <Tabs defaultValue="classes">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="classes">Classes</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="memberships">Memberships</TabsTrigger>
              </TabsList>
              
              <TabsContent value="classes" className="space-y-4 py-4">
                <h3 className="text-lg font-medium">Available Classes</h3>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  {selectedGym.classes.map((cls) => (
                    <div key={cls.id} className="mb-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{cls.name}</h4>
                          <p className="text-sm text-muted-foreground">Instructor: {cls.instructor}</p>
                          <p className="text-sm flex items-center gap-1 mt-1">
                            <CalendarIcon className="h-3 w-3" /> {cls.schedule}
                          </p>
                          <p className="text-sm mt-1">Availability: {cls.enrolled}/{cls.capacity}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                          disabled={cls.enrolled >= cls.capacity}
                          onClick={() => handleEnrollClass(cls)}
                        >
                          {cls.enrolled >= cls.capacity ? "Full" : "Enroll"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="amenities" className="py-4">
                <h3 className="text-lg font-medium mb-4">Gym Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedGym.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                      <div className="h-2 w-2 rounded-full bg-[#0B294B]"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="memberships" className="py-4">
                <h3 className="text-lg font-medium mb-4">Membership Plans</h3>
                <div className="space-y-4">
                  {selectedGym.membershipOptions.map((membership) => (
                    <div key={membership.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{membership.name}</h4>
                        <p className="text-sm text-muted-foreground">{membership.price}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="text-[#0B294B] border-[#0B294B] hover:bg-[#0B294B]/10"
                        onClick={() => handleSelectMembership(membership)}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Class Enrollment Dialog */}
      <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enroll in Class</DialogTitle>
          </DialogHeader>
          
          {selectedClass && (
            <div className="py-4">
              <h3 className="font-medium text-lg">{selectedClass.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">Instructor: {selectedClass.instructor}</p>
              <p className="text-sm text-muted-foreground mt-1">Schedule: {selectedClass.schedule}</p>
              <p className="text-sm text-muted-foreground mt-1">Available Spots: {selectedClass.capacity - selectedClass.enrolled}/{selectedClass.capacity}</p>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <p className="text-sm">
                  By enrolling in this class, you agree to attend or cancel at least 24 hours in advance. Please arrive 10 minutes before the class starts.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEnrollDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmEnrollment} className="bg-[#0B294B] text-white hover:bg-[#0a2544]">Confirm Enrollment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Membership Selection Dialog */}
      <Dialog open={membershipDialogOpen} onOpenChange={setMembershipDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for Membership</DialogTitle>
          </DialogHeader>
          
          {selectedGym && selectedMembership ? (
            <div className="py-4">
              <h3 className="font-medium text-lg">{selectedGym.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{selectedGym.location}</p>
              
              <div className="my-4 p-4 border rounded-md">
                <h4 className="font-medium">{selectedMembership.name} Plan</h4>
                <p className="text-sm text-muted-foreground">{selectedMembership.price}</p>
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <p className="text-sm">
                  By applying for this membership, you agree to the terms and conditions of the gym. After approval, membership fees will be automatically charged to your payment method on file.
                </p>
              </div>
            </div>
          ) : selectedGym ? (
            <div className="py-4">
              <h3 className="font-medium text-lg">{selectedGym.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{selectedGym.location}</p>
              
              <div className="my-4">
                <h4 className="font-medium mb-2">Select a Membership Plan:</h4>
                <div className="space-y-3">
                  {selectedGym.membershipOptions.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedMembership?.id === plan.id ? 'border-[#0B294B] bg-[#0B294B]/5' : ''
                      }`}
                      onClick={() => setSelectedMembership(plan)}
                    >
                      <div className="flex justify-between">
                        <h5 className="font-medium">{plan.name}</h5>
                        <p className="text-sm text-muted-foreground">{plan.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted/30 rounded-md">
                <p className="text-sm">
                  Please select a membership plan to continue with your application.
                </p>
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setMembershipDialogOpen(false);
              setSelectedMembership(null);
            }}>
              Cancel
            </Button>
            <Button 
              onClick={confirmMembership} 
              className="bg-[#0B294B] text-white hover:bg-[#0a2544]"
              disabled={!selectedMembership}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AvailableGyms;
