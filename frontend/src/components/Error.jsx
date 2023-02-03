
const Error = ({message}) => {
  <div className="w-full flex justify-center items-center">
    <h1 className="fond-bold text-2xl text-white mt-2">
      Something Wend wrong. Please try again
      {message}
    </h1>
  </div>
}

export default Error