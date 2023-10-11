import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  getEnquiries as getEnquiriesApi,
  updateEnquiryStatus,
  deleteEnquiry as deleteEnquiryApi,
} from "../../api/enquiry";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import PrviewEnquiry from "./PreviewEnquiry";
import useLoading from "../../hooks/useLoading";

export default function EnquiryTable() {
  const { setIsLoading } = useLoading();

  const [enquiries, setenquiries] = useState([]);
  const [enquiryId, setenquiryId] = useState(null);
  const [updateApiCalled, setupdateApiCalled] = useState(false);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [viewModalOpen, setviewModalOpen] = useState(false);
  const [activeViewEnquiry, setactiveViewEnquiry] = useState({});

  const getEnquiries = () => {
    setIsLoading(true);
    getEnquiriesApi()
      .then((res) => {
        setIsLoading(false);
        setenquiries(res);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const handleUpdateStatus = (enquiryId) => {
    setIsLoading(true);
    updateEnquiryStatus({ enquiryId })
      .then((res) => {
        setIsLoading(false);
        setupdateApiCalled(true);
        const updatedEnquiries = enquiries.map((enquiry) => {
          if (enquiry._id == enquiryId) {
            enquiry.status = enquiry.status == "pending" ? "seen" : "pending";
          }
          return enquiry;
        });

        setenquiries(updatedEnquiries);

        setupdateApiCalled(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const handleDeleteEnquiry = (id) => {
    setenquiryId(id);
    setdeleteModalOpen(true);
  };
  const deleteEnquiry = () => {
    setIsLoading(true);
    deleteEnquiryApi({ enquiryId })
      .then((res) => {
        setdeleteModalOpen(false);
        getEnquiries();
      })
      .catch((err) => {
        setIsLoading(false);
        setdeleteModalOpen(false);
      });
  };

  const handleSetActiveEnquiry = (enquiry) => {
    setactiveViewEnquiry(enquiry);
    setviewModalOpen(true);
  };

  return (
    <div>
      <ConfirmDeleteModal
        oncancel={() => setdeleteModalOpen(false)}
        onconfirm={deleteEnquiry}
        open={deleteModalOpen}
        heading={"Delete Enquiry"}
        text={"Are you sure you want to delete this enquiry?"}
      />
      <PrviewEnquiry
        open={viewModalOpen}
        enquiry={activeViewEnquiry}
        onclose={() => setviewModalOpen(false)}
      />
      {enquiries ? (
        <table class="table">
          <thead className="border-light">
            <tr className="bg-light border-bottom">
              <th scope="col" className="text-center">
                User Name
              </th>
              <th scope="col" className="text-center">
                User Email
              </th>
              <th scope="col" className="text-center">
                Message
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-light">
                <td className="text-center">{enquiry.name}</td>
                <td className="text-center">{enquiry.email}</td>
                <td className="text-center">{enquiry.message}</td>
                <td className="text-center">
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      checked={enquiry.status != "pending"}
                      disabled={updateApiCalled}
                      onClick={() => handleUpdateStatus(enquiry._id)}
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-light border"
                      onClick={() => handleDeleteEnquiry(enquiry._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-light border"
                      onClick={() => handleSetActiveEnquiry(enquiry)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
