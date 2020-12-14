import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"

const DesignerDelete = () => {
    const history = useHistory();
    document.location.href = "/admin";
}
export default DesignerDelete;