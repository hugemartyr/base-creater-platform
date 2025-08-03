import axios from "axios";

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;

export async function uploadToPinata(name: string, bio: string, image: File) {
  // Step 1: upload image to IPFS
  const formData = new FormData();
  formData.append("file", image);

  const imageRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const imageHash = imageRes.data.IpfsHash;
  const imageUrl = `ipfs://${imageHash}`;

  // Step 2: upload metadata JSON
  const metadata = {
    name,
    bio,
    image: imageUrl,
  };

  const metadataRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      "Content-Type": "application/json",
    },
  });

  const metadataHash = metadataRes.data.IpfsHash;
  return `ipfs://${metadataHash}`;
}
