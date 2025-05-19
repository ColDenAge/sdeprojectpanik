import React, { useRef, useState, useEffect } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/context/AuthProvider";

const PAYMENT_METHODS = [
  {
    name: "GCash",
    number: "0927-420-3298",
    account: "ADRIANE BECERA LOQUINTE",
    qr: "/qr/gcash.png",
  },
  {
    name: "GoTyme",
    number: "0153 0708 4962",
    account: "ADRIANE BECERA LOQUINTE",
    qr: "/qr/gotyme.png",
  },
];

const ManualPaymentSection = () => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [userGyms, setUserGyms] = useState<any[]>([]);
  const [selectedGymId, setSelectedGymId] = useState("");

  useEffect(() => {
    // Fetch all gyms for the dropdown
    const fetchGyms = async () => {
      const gymsRef = collection(db, "gyms");
      const snapshot = await getDocs(gymsRef);
      setUserGyms(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    };
    fetchGyms();
  }, []);

  useEffect(() => {
    if (userGyms.length === 1) {
      setSelectedGymId(userGyms[0].id);
    }
  }, [userGyms]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file || !user || !selectedGymId) {
      setError("Missing required information. Please select a gym and try again.");
      return;
    }
    setUploading(true);
    setError("");
    setSuccess(false);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `receipts/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      // Save record to Firestore
      await addDoc(collection(db, "manualPayments"), {
        receiptUrl: url,
        fileName: file.name,
        uploadedAt: serverTimestamp(),
        status: "Pending",
        userId: user.uid,
        userEmail: user.email,
        gymId: selectedGymId,
      });
      setSuccess(true);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Complete Your Payment</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-blue-900 text-sm">
          After making payment, upload your receipt below. Your transaction will be verified by an admin before your order is marked as complete.
        </div>
        <label className="block font-medium mb-1">Select Gym</label>
        <select
          className="w-full mb-2 p-2 border rounded"
          value={selectedGymId}
          onChange={e => setSelectedGymId(e.target.value)}
          disabled={uploading}
        >
          <option value="">Select a gym</option>
          {userGyms.map(gym => (
            <option key={gym.id} value={gym.id}>{gym.name}</option>
          ))}
        </select>
        {PAYMENT_METHODS.map((method) => (
          <div key={method.name} className="mb-4">
            <div className="font-medium">{method.name}</div>
            <div>{method.number}</div>
            <div className="text-xs text-gray-600">Account Name: {method.account}</div>
          </div>
        ))}
        <div className="mt-4">
          <label className="block font-medium mb-1">Upload Payment Receipt</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mb-2"
            disabled={uploading}
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading || !selectedGymId}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Receipt"}
          </button>
          <div className="text-xs text-gray-500 mt-1">
            Accepted formats: JPG, PNG (Max 5MB). Ensure <b>payment reference number</b> is visible in the image.
          </div>
          {success && <div className="text-green-600 mt-2">Receipt uploaded! Awaiting admin verification.</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="font-medium mb-2">Scan QR Code</div>
        <div className="flex gap-4">
          {PAYMENT_METHODS.map((method) => (
            <div key={method.name} className="flex flex-col items-center">
              <img src={method.qr} alt={method.name + " QR"} className="w-24 h-24 object-contain border rounded mb-1" />
              <span className="text-xs">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualPaymentSection; 