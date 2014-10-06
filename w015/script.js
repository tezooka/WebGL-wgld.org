onload = function(){
    var c = document.getElementById('canvas');
    c.width = 300;
    c.height = 300;

    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clearDepth(1.0);

    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

    var v_shader = create_shader('vs');
    var f_shader = create_shader('fs');

    var prg = create_program(v_shader, f_shader);

    var attLocation = gl.getAttribLocation(prg, 'position');

    var attStride = 3;

    var vertex_position = [
         0.0, 1.0, 0.0,
         1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
    ]

    var vbo = create_vbo(vertex_position);

    function create_shader(id){
        var shader;

        var scriptElement = document.getElementById(id);

        if(!scriptElement){
            return;
        }

        switch(scriptElement.type){
            case 'x-shader/x-vertex':
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;
            case 'x-shader/x-fragment':
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
        }

        gl.shaderSource(shader, scriptElement.text);

        gl.compileShader(shader);

        if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            return shader;
        } else {
            alert(gl.getShaderInfoLog(shader));
        }
    }

    function create_program(vs, fs){
        var program = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.linkProgram(program);

        if(gl.getProgramParameter(program, gl.LINK_STATUS)){
            gl.useProgram(program);

            return program;
        } else {
            alert(gl.getProgramInfoLog(program));
        }
    }

    function create_vbo(data){
        var vbo = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return vbo;
    }
}