import PixelBlast from "./PixelBlast";

function PagePixelBg() {
  return (
    <div className="page-pixel-bg">
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
  );
}

export default PagePixelBg;