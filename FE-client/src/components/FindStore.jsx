import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function FindStore() {
  return (
    <>
      <div>
        <InfoTop />
        <Header />
        <div style={{ height: "100dvh" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62705.12750241247!2d106.60859623149429!3d10.80591483249126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752905d7943e63%3A0xae4e0902e7b0347e!2sGi%C3%A0y%20Nike!5e0!3m2!1svi!2s!4v1712224149414!5m2!1svi!2s"
            width="100%"
            height="100%"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Jordan"
            className="full"
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
