const getBasePath = () => {
    let base_url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${process.env.NEXT_PUBLIC_MY_URL}`;

    return base_url;
}

export default getBasePath;