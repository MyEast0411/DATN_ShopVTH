import { BellFilled } from "@ant-design/icons";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
  TimelineBody,
} from "@material-tailwind/react";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { format } from "date-fns";
import { MailIcon } from "./icon/MailIcon";
import { LockIcon } from "./icon/LockIcon";
import { useState } from "react";
import TableHDCT from "./table/TableHDCT";
function InForHD({ item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [logined, setLogined] = useState(false);

  return (
    <div>
      <div className="infor grid grid-cols-3 gap-4 mb-5 ">
        <div
          className="space-y-3"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            paddingLeft: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            Mã hóa đơn :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon.ma}
            </span>
          </p>
          <p>
            Khách hàng :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon?.id_khach_hang.ten}
            </span>
          </p>
          <p>
            Người Nhận :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon.tenKhachHang}
            </span>
          </p>
          <p>
            Số Điện Thoại :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon.sdt}
            </span>
          </p>
        </div>

        <div
          className="space-y-3 "
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            paddingLeft: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            Địa Chỉ :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon.diaChi}
            </span>
          </p>
          <p>
            Số Tiền :{" "}
            <span className="italic  font-light">
              &nbsp;&nbsp; {Intl.NumberFormat().format(item.hoaDon.tongTien)}₫
            </span>
          </p>
          <p>
            Tiền Ship :
            <span className="italic  font-light">
              &nbsp;&nbsp; {Intl.NumberFormat().format(item.hoaDon.tienShip)}₫
            </span>
          </p>
        </div>

        <div
          className="space-y-3 "
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            paddingLeft: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            Ngày Tạo :{" "}
            <span className="italic font-light">
              &nbsp;&nbsp;{" "}
              {format(new Date(item.hoaDon.ngayTao), "dd-MM-yyyy HH:mm")}
            </span>
          </p>
          <p>
            Ngày Nhận :
            <span className="italic font-light">
              &nbsp;&nbsp;{" "}
              {format(new Date(item.hoaDon.ngayNhan), "dd-MM-yyyy HH:mm")}
            </span>{" "}
          </p>

          {/* <p>
            Trạng Thái :
            <span className="italic font-light">
              &nbsp;&nbsp; {item.hoaDon.trangThai}
            </span>{" "}
          </p> */}

          <p>
            Chi tiết đơn hàng :&nbsp;&nbsp;
            <Link
              onPress={onOpen}
              size="md"
              underline="always"
              style={{
                cursor: "pointer",
              }}
            >
              Xem chi tiết
            </Link>
          </p>

          <Modal
            size="3xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            // placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {!logined ? (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Log in
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Email"
                          placeholder="Enter your email"
                          variant="bordered"
                        />
                        <Input
                          endContent={
                            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          variant="bordered"
                        />
                        <div className="flex py-2 px-1 justify-between">
                          <Checkbox
                            classNames={{
                              label: "text-small",
                            }}
                          >
                            Remember me
                          </Checkbox>
                          <Link color="primary" href="#" size="sm">
                            Forgot password?
                          </Link>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Close
                        </Button>
                        <Button
                          color="primary"
                          onPress={onClose}
                          onClick={() => setLogined(true)}
                        >
                          Sign in
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Hóa đơn chi tiết
                      </ModalHeader>
                      <ModalBody className="w-full">
                        <TableHDCT listHDCT={item.hoaDonChiTiets} />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <hr />
      <div className=" timeline mt-5">
        <div className="w-[32rem]">
          {item.lichSuHoaDons.length == 0 ? (
            ""
          ) : (
            <>
              <Timeline>
                {item.lichSuHoaDons.map((lshd, i) => (
                  <>
                    <TimelineItem key={i + 1}>
                      <TimelineConnector />
                      <TimelineHeader className="h-3">
                        <TimelineIcon />
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="leading-none"
                        >
                          {lshd.moTaHoaDon}
                        </Typography>
                      </TimelineHeader>
                      <TimelineBody className="pb-8">
                        <Typography
                          variant="small"
                          color="gary"
                          className="font-normal text-gray-600"
                        >
                          <p>
                            {format(new Date(lshd.ngayTao), "dd-MM-yyyy HH:mm")}
                          </p>
                          <p>Người tạo : {lshd.nguoiTao}</p>
                        </Typography>
                      </TimelineBody>
                    </TimelineItem>
                  </>
                ))}
              </Timeline>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InForHD;
