import { API } from "../Backend";

export const signup = (pats, path) => {
  console.log(pats);
  //console.log(JSON.stringify(pats));
  return fetch(`${API}${path}`, {
    method: "POST",
    body: JSON.stringify(pats),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
};
export const signin = (pats, path) => {
  console.log(pats);
  //console.log(JSON.stringify(pats));
  return fetch(`${API}${path}`, {
    method: "POST",
    body: JSON.stringify(pats),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
  }
};
export const pat_dets = (pats) => {
  let t = {};
  t = JSON.parse(localStorage.getItem("jwt"));
  console.log(t.token);
  console.log(pats);
  console.log(JSON.stringify(pats));
  return fetch(`${API}/catalog/patients/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${t.token}`,
    },
    body: JSON.stringify(pats),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
};

export const getPatDetails = (id) => {
  return fetch(`${API}/catalog/patients/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePatDetails = (body, id) => {
  return fetch(`${API}/catalog/patients/${id}/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
};

export const getAllPatientDetails = () => {
  return fetch(`${API}/catalog/patients`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const uploadPatientReport = (file) => {
  console.log(JSON.stringify(file));
  return fetch(`${API}/catalog/doctors/uploadReport`, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(file),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// export const uploadPrescription = (data) => {
//   console.log(JSON.stringify(file))
//   return fetch("${API}/catalog/doctors/uploadReport" , {
//     method : "POST",
//     headers : {
//       Accept : "application/json",
//       "Content-Type" : "application/json",
//     },
//     body  : JSON.stringify(file),
//   }  ).then(res => res.json()).catch(err => {console.log(err)})

// }

export const addPrescription = (data) => {
  console.log(data);
  return fetch(`${API}/catalog/patients/prescriptions/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export const getPres = (id) => {
  return fetch(`${API}/catalog/patient/${id}/pres`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addGraphValues = (data) => {
  console.log(data);
  return fetch(`${API}/catalog/doctor/create/graph`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export const getPatGraph = (id) => {
  return fetch(`${API}/catalog/patient/${id}/graphvalues`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const allHospitals = () => {
  return fetch(`${API}/api/getAllHospitals`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));

}

export const nearHospitals = (lat,long,radius) => {
  return fetch(`${API}/api/getHospital/${lat}/${long}/${radius}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));

}
