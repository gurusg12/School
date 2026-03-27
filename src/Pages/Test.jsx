import React, { useEffect, useState } from 'react'

const Test = () => {
    const users = [
        { name: "gurusg", role: "admin", branch: "salotagi" },
        { name: "gurusg", role: "admin", branch: "indi" },
        { name: "gurusg", role: "admin", branch: "sundagi" }
    ];
    const [branch, setBranch] = useState([]);
    const Branch = () => {
        const branchs = users.map((g) => g.branch);
        const newbr = [...new Set(branchs)];
        setBranch(newbr);
    };
    useEffect(() => {
        Branch();
    }, []);
    return (
        <div>
            <button onClick={Branch}>add</button>
            <input type="text" />
            {/* ✅ Correct Select */}
            <select className="border p-2">
                <option value="">Select Branch</option>
                {branch.map((t, i) => (
                    <option key={i} value={t}>
                        {t}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Test;