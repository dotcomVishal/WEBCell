import HoverLetters from "../components/hover";
import PixelBlast from "../components/PixelBlast";

function Home() {
  return (
    <section className="hero">
      <div className="pixel-bg">
        <PixelBlast
          variant="square"
          pixelSize={5}
          color="#B19EEF"
          patternScale={1.5}
          patternDensity={0.4}
          pixelSizeJitter={0.45}
          enableRipples
          rippleSpeed={1.25}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={1.25}
          edgeFade={0.03}
          transparent
        />
      </div>

      <div className="hero-mask"></div>

      <div className="hero-content">
        <HoverLetters text="DEV.cell" />
        <p>Developers of IIT Mandi</p>
      </div>
    </section>
  );
}

export default Home;