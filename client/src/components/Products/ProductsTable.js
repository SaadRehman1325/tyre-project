import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCloudDownload,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteProduct,
  getAllProducts,
  getSoldProducts,
} from "../../api/product";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import EditProductModal from "./EditProductModal";
import useLoading from "../../hooks/useLoading";
import { CSVLink } from "react-csv";
import JSZip from "jszip";

export default function ProductsTable({ productsStatus }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  const { setIsLoading } = useLoading();

  const [products, setproducts] = useState([]);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const [productId, setproductId] = useState(null);

  const handleDeleteProduct = () => {
    setIsLoading(true);
    deleteProduct({ productId })
      .then((res) => {
        setIsLoading(false);
        setdeleteModalOpen(false);
        getProducts();
      })
      .catch((err) => {
        setIsLoading(false);
        setdeleteModalOpen(false);
      });
  };

  const getProducts = () => {
    productsStatus == "available"
      ? getAllProducts()
          .then((res) => {
            setIsLoading(false);
            setproducts(res);
          })
          .catch((err) => {
            setIsLoading(false);
          })
      : getSoldProducts()
          .then((res) => {
            setIsLoading(false);
            setproducts(res);
          })
          .catch((err) => {
            setIsLoading(false);
          });
  };

  useEffect(() => {
    getProducts();
    setIsLoading(true);
  }, [productsStatus]);

  async function fetchImage(url) {
    const response = await fetch(url);
    if (!response.ok) {
      return;
    }
    const blob = await response.blob();
    return blob;
  }

  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escapedValue = row[header].toString().replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  }

  const generateZip = (product) => {
    // const productsCopy = JSON.parse(JSON.stringify(product));
    const zip = new JSZip();
    const csvDataObj = {
      name: product.name,
      height: product.height,
      width: product.width,
      diameter: product.diameter,
    };
    // Object.keys(productsCopy).map((data) => {
    //   data == "images"
    //     ? delete productsCopy[data]
    //     : data == "_id"
    //     ? delete productsCopy[data]
    //     : data == "__v"
    //     ? delete productsCopy[data]
    //     : data == "brand"
    //     ? (productsCopy[data] = productsCopy[data].name)
    //     : data == "createdAt"
    //     ? (productsCopy[data] = new Date(productsCopy[data]))
    //     : null;
    // });

    // const csvData = convertToCSV([productsCopy]);
    const csvData = convertToCSV([csvDataObj]);
    zip.file("data.csv", csvData);

    const imageFolder = zip.folder("images");
    const imagePromises = product.images.map(async (imageUrl, index) => {
      const imageBlob = await fetchImage(baseUrl + imageUrl);
      imageFolder.file(
        `${imageUrl.split("/")[imageUrl.split("/").length - 1]}`,
        imageBlob
      );
    });

    return Promise.all(imagePromises).then(() =>
      zip.generateAsync({ type: "blob" })
    );
  };

  const handleDownloadData = async (product) => {
    try {
      const zipBlob = await generateZip(product);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `product-${product._id}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating zip:", error);
    }
  };

  return (
    <div>
      {deleteModalOpen && (
        <ConfirmDeleteModal
          open={deleteModalOpen}
          oncancel={() => setdeleteModalOpen(false)}
          productId={productId}
          onconfirm={handleDeleteProduct}
          heading={"Delete Product"}
          text={"Are you sure you want to delete this product?"}
        />
      )}
      {editModalOpen && (
        <EditProductModal
          productId={productId}
          open={editModalOpen}
          oncancel={() => seteditModalOpen(false)}
          getProducts={getProducts}
        />
      )}
      <table class="table">
        <thead className="border-light">
          <tr className="bg-light border-bottom">
            <th></th>
            <th scope="col" className="text-center">
              Product Name
            </th>
            {/* <th scope="col" className="text-center">
              Product Brand
            </th> */}
            <th scope="col" className="text-center">
              Product Price
            </th>
            <th scope="col" className="text-center">
              Product Size
            </th>
            <th scope="col" className="text-center">
              Product Discount
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-light">
              <td>
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL + "/" + product.images[0]
                  }
                />
              </td>
              <td className="text-center">{product.name}</td>
              {/* <td className="text-center">
                {product.brand?.image ? (
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "/" +
                      product.brand.image
                    }
                    className="product-table-brand-image"
                  />
                ) : (
                  product.brand?.name
                )}
              </td> */}
              <td className="text-center">{product.price}</td>
              <td className="text-center">
                {product.width +
                  " / " +
                  product.height +
                  " / " +
                  product.diameter}
              </td>
              <td className="text-center">{product.discount}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-3">
                  <button
                    disabled={productsStatus == "sold"}
                    className="btn btn-light border"
                    onClick={() => {
                      setproductId(product._id);
                      setdeleteModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    disabled={productsStatus == "sold"}
                    className="btn btn-light border"
                    onClick={() => {
                      setproductId(product._id);
                      seteditModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="btn btn-light border"
                    onClick={() => handleDownloadData(product)}
                  >
                    <FontAwesomeIcon icon={faCloudDownload} color="black" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
