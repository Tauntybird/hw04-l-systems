import {vec3, mat4} from 'gl-matrix';
// import { EPSILON } from 'gl-matrix/src/gl-matrix/common';

export default class Turtle {
  position: vec3 = vec3.create();
  orientation: vec3 = vec3.create();
  recursionDepth: number = 0;
  thickness: number = 0;
  length: number = 0;
  color: vec3 = vec3.create();

  constructor(pos: vec3, orient: vec3, recDepth: number, thick: number, len: number, col: vec3) {
    this.position = pos;
    this.orientation = orient;
    this.recursionDepth = recDepth;
    this.thickness = thick;
    this.length = len;
    this.color = col;
  }

  // rotateZ() {
  rotateZ(rad: number) {
    // vec3.rotateZ(this.orientation, this.orientation, this.position, 25 * Math.PI / 180);
    vec3.rotateZ(this.orientation, this.orientation, this.position, rad);
    vec3.normalize(this.orientation, this.orientation);
    // vec3.rotateZ(this.orientation, this.orientation, vec3.fromValues(0, 0, 0), rad * Math.PI / 180);
  }

  moveForward(): [Array<number>, Array<number>, Array<number>, Array<number>, Array<number>, number] { 
    let transformCols0Array: Array<number> = [];
    let transformCols1Array: Array<number> = [];
    let transformCols2Array: Array<number> = [];
    let transformCols3Array: Array<number> = [];
    let colorsArray: Array<number> = [];
    let numInstancesCylinder: number = 0;

    let transformMat: mat4 = mat4.create();
    mat4.translate(transformMat, transformMat, this.position);

    // let eps: number = .001;
    // if (Math.abs(this.orientation[0]) > eps && Math.abs(this.orientation[1] - 1) > eps && Math.abs(this.orientation[2]) > eps) {
    //   let localYAxis: vec3 = this.orientation;
    //   let localXAxis: vec3 = vec3.create();
    //   vec3.cross(localXAxis, vec3.fromValues(0, 1, 0), localYAxis);
    //   let localZAxis: vec3 = vec3.create();
    //   vec3.cross(localZAxis, localXAxis, localYAxis);
    //   for (let i = 0; i < 3; i++) {
    //     transformCols0Array[i] = localXAxis[i];
    //     transformCols1Array[i] = localYAxis[i];
    //     transformCols2Array[i] = localZAxis[i];
    //   }
    // }

    // let rotAxis: vec3 = vec3.create();
    // vec3.subtract(rotAxis, vec3.fromValues(0, 1, 0), this.orientation);
    // let dotProd: number = vec3.dot(this.orientation, vec3.fromValues(0, 1, 0));
    // mat4.rotate(transformMat, transformMat, Math.acos(dotProd), rotAxis);

    // let v: vec3 = vec3.create();
    // vec3.cross(v, vec3.fromValues(0, 1, 0), this.orientation);
    // let c: number = vec3.dot(this.orientation, vec3.fromValues(0, 1, 0));
    // let vx: mat4 = mat4.fromValues(0, v[2], -v[1], 0, -v[2], 0, v[0], 0, v[1], -v[0], 0, 0, 0, 0, 0, 0);
    // let vx2: mat4 = mat4.create();
    // mat4.multiply(vx2, vx, vx);
    // mat4.multiplyScalar(vx2, vx2, 1 / (1 + c));
    // mat4.add(transformMat, transformMat, vx);
    // mat4.add(transformMat, transformMat, vx2);
    

//translate
//rotate
//scale
    // mat4.translate(transformMat, transformMat, vec3.fromValues(5, 0, 0));  
    // mat4.rotate(testRotate, testRotate, degsToRads(100), zAxis);
    // mat4.rotate(testRotate, testRotate, degsToRads(50), yAxis);
    // mat4.rotate(transformMat, transformMat, degsToRads(45), xAxis);
    // mat4.scale(transformMat, transformMat, vec3.fromValues(1, .5, 1));

    // let scaledOrient: vec3;
    // for (let i = 0; i < this.length; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     transformCols0Array.push(transformMat[0 + j]);
    //     transformCols1Array.push(transformMat[4 + j]);
    //     transformCols2Array.push(transformMat[8 + j]);
    //     transformCols3Array.push(transformMat[12 + j]);
    //     colorsArray.push(1);
    //   }
    //   numInstancesCylinder++;
    //   // vec3.scale(scaledOrient, this.orientation, 1.0);
    //   vec3.add(this.position, this.position, this.orientation);
    //   mat4.translate(transformMat, transformMat, this.orientation);
    //   //draw cylinder
    // }

    let scaledOrient: vec3 = vec3.create();
    vec3.scale(scaledOrient, this.orientation, 5.0);
    
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < 4; j++) {
        transformCols0Array.push(transformMat[0 + j]);
        transformCols1Array.push(transformMat[4 + j]);
        transformCols2Array.push(transformMat[8 + j]);
        transformCols3Array.push(transformMat[12 + j]);
        colorsArray.push(1);
      }
      numInstancesCylinder++;
      vec3.add(this.position, this.position, scaledOrient);
      mat4.translate(transformMat, transformMat, scaledOrient);
      //draw cylinder
    }
    return [transformCols0Array, transformCols1Array, transformCols2Array, transformCols3Array, colorsArray, numInstancesCylinder];
  }

  clone(): Turtle {
    return new Turtle(vec3.clone(this.position), vec3.clone(this.orientation), this.recursionDepth, this.thickness, this.length, this.color);
  }
}