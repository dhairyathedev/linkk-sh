const confirmSignUp = async () => {
    try {
      const input = {
        email: email,
        uid: uid,
        lastSignIn: lastSignIn,
        lastSignInIp: await getIp(),
        accountCreateIp: await getIp()
      }
      const {data, error} = await supabase.from("users").insert(input)
      console.log(data)
    } catch (error) {
      throw new error
    }
  };


  export const getStaticProps = async () => {
    const {data: email} = await supabase.auth.getUser();
    return{
      props: {
        email
      }
    }
  }