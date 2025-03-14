import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const EditRooms = () => {
  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [room, setRoom] = useState(null);
  const { roomID } = useParams();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/rooms?RoomID=${roomID}`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setRoom(response.data); // Save rooms
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchRooms();
  }, [])

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/roomtypes`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setRoomTypes(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRoomTypes();
  }, [])

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    room_number: Yup.string().required("Room number is required"),
    roomTypeID: Yup.string()
      .required("Room Type is required"),
    status: Yup.string()
      .required("Room status is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      roomID: roomID, // Always null for adding a new category
      room_number: room?.[0].room_number || '',
      roomTypeID: room?.[0].roomTypeID || '',
      status: room?.[0].status || "",
    },
    enableReinitialize: true, // Allows form to reinitialize when data is fetched
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/hotel/addrooms`,
          values,
          {
            headers: {
              APIKey: process.env.REACT_APP_APIKey,
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 2000,
          })
        } else {
          toast.success("Room edited successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error("Failed to edit room");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Edit Rooms</h1>
      </div>

      {/* Room Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room Number */}
          <div>
            <label className="block text-gray-700">Room Number</label>
            <input
              type="text"
              name="room_number"
              {...formik.getFieldProps("room_number")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.room_number && formik.errors.room_number && (
              <p className="text-red-500 text-sm">{formik.errors.room_number}</p>
            )}
          </div>

          {/* Room type */}
          <div>
            <label className="block text-gray-700">Room Type</label>
            <select
              name="roomTypeID"
              value={formik.values.roomTypeID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1 text-black"
            >
              <option value="">Select room type</option>
              {roomTypes.map((type) => (
                <option key={type.roomTypeID} value={type.roomTypeID}>
                  {type.type_name}
                </option>
              ))}
            </select>
            {formik.touched.roomTypeID && formik.errors.roomTypeID && (
              <p className="text-red-500 text-sm">{formik.errors.roomTypeID}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Room Status</label>
            <select
              name="status"
              {...formik.getFieldProps("status")}
              className="w-full px-5 py-2 border rounded mt-1"
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-sm">{formik.errors.status}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Editing..." : "Edit Room"}
        </button>
      </form>
    </div>
  );
};

export default EditRooms;
