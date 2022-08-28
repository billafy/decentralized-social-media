import React from 'react'
import ReactPlayer from 'react-player'
  
export default function Video(){
  return (
    <div>
      <h2>Dive into a world full of creative content</h2>
      <ReactPlayer url='https://www.youtube.com/watch?v=EJzB_Fa27ko' />
    </div>
  )
}