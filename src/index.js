import React from "react";
import ReactDOM from "react-dom";
import ShadertoyReact from "shadertoy-react";

import "./styles.css";

const fragmentShader = `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = vec2(fragCoord.xy / iResolution.xy);
    vec2 uv = fragCoord-vec2(iResolution.xy/2.0);
    uv = 2.0*uv/iResolution.y;
   	float magnitude = length(uv);


    uv = uv/(1.0+length(uv));
    float pixel;
    if (mod(fragCoord.x,2.0)<1.0){
        uv.x = uv.x+(0.1*sin(uv.y*10.0))*sin(iTime);
    	pixel = sign((mod(uv.y+iTime*0.04,0.2)-0.1))*sign((mod(uv.x+(iTime*0.12),0.2)-0.1));
    }else{
        uv.x = uv.x+(-0.1*sin(uv.y*10.0))*sin(iTime);
		pixel = sign((mod(uv.y+iTime*-0.05,0.2)-0.1))*sign((mod(uv.x+(iTime*-0.2),0.2)-0.1));

    }
    fragColor = vec4(0.4,0.2,0.5,1.0);
    if (pixel == 1.0){
    	fragColor=vec4(0.0,0.5,0.5,1.0);
        //fragColor = vec4(texture(iChannel1,p).xyz,1.0);
    }
    //vec3 color = texture(iChannel1,p).xyz;
    //fragColor = vec4(texture(iChannel1,p).xyz,1.0);
}

`;

function App() {
  return (
    <div className="App">
      <ShadertoyReact fs={fragmentShader} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
