import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import data from '../package.json'  

const skills = data.Qualifications  
const project = data.projects


const Resume = () => {

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Text fontSize={0.3} position-x={-2.5} position-y={2.6} >
     {skills.sectionName}{":"}
      <meshBasicMaterial color="white"  />
      </Text>
      <Text fontSize={0.2} position-x={-2} position-y={2.2} >
     {skills.skillone}{" , "}{skills.skilltwo}{" , "}{skills.skillthree}
      <meshBasicMaterial color="white" />
      </Text>
      <Text fontSize={0.3} position-x={-2.3} position-y={1.5} >
     {project.sectionName}
      <meshBasicMaterial color="white"  />
      </Text>
      <Text fontSize={0.2} position-x={-0.7} position-y={1} >
     {project.projectOne}{" , "}{project.projectTwo}{" , "}{project.projectThree}
      <meshBasicMaterial color="white"  />
      </Text>
    </Canvas>
  )
}

export default Resume
