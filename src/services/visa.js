import instance from "../axios/axios";

export const createVisa = async (data) => {
  try {
    const res = await instance.post("/visa", data);
    if (res.data.status !== "success") {
      throw new Error("An occurred error when create visa");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateVisa = async (id, data) => {
  try {
    const res = await instance.patch(`/visa/${id}`, data);

    if (res.data.status !== "success") {
      throw new Error("An occurred error when update visa");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};
