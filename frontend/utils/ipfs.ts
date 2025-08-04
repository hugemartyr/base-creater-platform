// import axios from "axios";

// const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;

// export async function uploadToPinata(name: string, bio: string, image: File) {
//   // Step 1: upload image to IPFS
//   const formData = new FormData();
//   formData.append("file", image);

//   const imageRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//     maxBodyLength: Infinity,
//     headers: {
//       Authorization: `Bearer ${PINATA_JWT}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   const imageHash = imageRes.data.IpfsHash;
//   const imageUrl = `ipfs://${imageHash}`;

//   // Step 2: upload metadata JSON
//   const metadata = {
//     name,
//     bio,
//     image: imageUrl,
//   };

//   const metadataRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
//     headers: {
//       Authorization: `Bearer ${PINATA_JWT}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const metadataHash = metadataRes.data.IpfsHash;
//   return `ipfs://${metadataHash}`;
// }




export async function uploadToPinata(name: string, bio: string, file: File): Promise<string> {
  const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
  if (!PINATA_JWT) throw new Error("Missing Pinata JWT in .env");

  const formData = new FormData();
  const metadata = {
    name,
    keyvalues: {
      bio,
    },
  };

  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify(metadata));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Pinata upload failed: " + error);
  }

  const { IpfsHash } = await res.json();
  return `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
}
