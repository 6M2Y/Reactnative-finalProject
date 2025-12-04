import {getClientApi} from "./apiClient";

export const updateProfile = async (user: any) => {
  const apiClient = await getClientApi();
    const response = await apiClient.post('/users/:id', user)
    return response.data;
};


export const uploadAvatar = async (user: any) => {
  const apiClient = await getClientApi();
    const response = await apiClient.post('/users/:id/avatar', user)
    return response.data;
};


export const loginUser = async (email: String, passord: String) =>
{
  const apiClient = await getClientApi();
    const response = await apiClient.post('auth/login', { email, passord })
    return response.data;
};

export const registerUser = async ( name :string,email: string,password: string,role : "parent" | "child", familyCode:string) => {
  const apiClient = await getClientApi()
  const response =   await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role,
        familyCode,
  });
  return response.data
}

export const getAvailableTasks = async (familyCode: string) => {
  const apiClient = await getClientApi();
    const response = await apiClient.get(`/family/${familyCode}/available`)
    return response.data
};

export const getAssignedTasks = async (userId: string) => {
  const apiClient = await getClientApi();
    const response = await apiClient.get(`/family/assigned/${userId}`)
    return response.data
};

// Upload proof of task completion
export const uploadProof = async (formData: any, taskId: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.post(
    `/upload/upload-proof/${taskId}`,
    formData,{ headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
}


export const getFamilyMembers = async (familyCode: string) => {
  const apiClient = await getClientApi();
  const response = await apiClient.get(`/family/${familyCode}`);
  return response;
};
/* export const loginUser = async (email: string, password: string) => {
    const apiClient = await getClientApi();
    const response = await apiClient.post('/auth/login', {
        email,
        password,
    });
    return response;
}; */