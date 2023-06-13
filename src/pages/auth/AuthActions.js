import { toast } from "react-hot-toast";
import { loginReq, meReq } from "../../contexts/ApiAction";
import { createCookie } from "../../utils/GlobalUtil";

export const onFinish = (values, navigate, dispatch, setLoader) => {
  const formData = new FormData();
  formData.append("username", values.username);
  formData.append("password", values.password);
  setLoader(true);

  loginReq(formData)
    .then((res) => {
      createCookie(res.data.access_token, 30);

      dispatch({
        type: "LOGIN",
        payload: res.data.access_token,
      });

      // meReq
      meReq()
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({
            type: "USER",
            payload: response.data,
          });
          toast.success("Login Successfully");
          navigate("/", { replace: true });
        })

        .catch((error) => {
          toast.error("Something Wrong !");
        });

      setLoader(false);
    })
    .catch((error) => {
      setLoader(false);
      toast.error("Login Failed");
    });
};

export const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
