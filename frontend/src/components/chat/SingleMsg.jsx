import React from 'react'

const SingleMsg = ({message}) => {
  return (
    <div class="self-start w-3/4 my-2">
    <div class="p-4 text-sm bg-white rounded-t-lg rounded-r-lg shadow">
        {message.content}
    </div>
</div>
  )
}

export default SingleMsg