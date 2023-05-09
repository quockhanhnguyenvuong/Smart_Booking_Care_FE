import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../services/userService";
import { NumberFormatBase } from "react-number-format";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);

    // console.log("check data", this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId)
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = (dataTime) => {
    console.log("check renderTimeBooking: ", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.timeTypeData.valueVI;

      let date = moment.unix(+dataTime.data / 1000).format("dddd - DD/MM/YYYY");
      return (
        <>
          <div>
            {time} - {this.capitalizeFirstLetter(date)}{" "}
          </div>
          <div>Miễn phí</div>
        </>
      );
    }
  };

  render() {
    let { dataProfile } = this.state;
    console.log("check stateeeeeee: ", this.state);
    console.log("check data profile:", dataProfile);
    let { isShowDescriptionDoctor, dataTime } = this.props;
    let nameVi = "";

    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.fistName}`;
    }

    // console.log("check props: dataTime: ", dataTime);
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{nameVi}</div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking()}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          Giá khám:
          {dataProfile && dataProfile.Doctor_Infor ? (
            <NumberFormatBase
              className="currency"
              value={dataProfile.Doctor_Infor.pricTypeData.valueVI}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"VND"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);