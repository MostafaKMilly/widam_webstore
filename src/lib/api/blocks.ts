"use server";

interface BlocksResponse {
  status_code: number;
  error: number;
  message: string;
  data: Block[];
}

interface Block {
  block_id: string;
  name: string;
  // Add other relevant fields
}

async function getBlocks(
  block_id: string,
  page_no: number
): Promise<BlocksResponse | undefined> {
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.block.blocks?block_id=${encodeURIComponent(
    block_id
  )}&page_no=${encodeURIComponent(page_no.toString())}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "ar",
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: BlocksResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blocks:", error);
  }
}

export { getBlocks };

export type { BlocksResponse, Block };
