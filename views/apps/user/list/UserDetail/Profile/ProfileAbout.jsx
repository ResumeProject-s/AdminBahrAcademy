// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">درباره کاربر</h5>
        <CardText>{data.userAbout}</CardText>
        <div className="mt-2">
          <h5 className="mb-75"> وضعیت کاربر:</h5>
          <CardText>{data.active ? "فعال" : "غیرفعال"}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">محل سکونت:</h5>
          <CardText>{data.homeAdderess}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">ایمیل:</h5>
          <CardText>{data.gmail}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">شماره تماس:</h5>
          <CardText>{data.phoneNumber}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">نقش : </h5>
          <CardText>
            {data.roles
              ? data.roles.map((role) => {
                  return <p>{role.roleName}</p>;
                })
              : "no"}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
