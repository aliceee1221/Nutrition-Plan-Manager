import { useState } from 'react'; // 保存用户当前填写的内容

const NutritionRequestForm = () => { // 建立form data
    const [formData, setFormData] = useState({
        nutritionGoal: '', dietaryPreferences: '', allergyInformation: ''
    });

    const handleSubmit = (e) => { // 阻止 Submit 时浏览器默认可能刷新页面
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Submit Nutrition Request</h1>
            <input
              type="text"
              placeholder="Nutrition Goal"
              value={formData.nutritionGoal}
              onChange={(e) => setFormData({ ...formData, nutritionGoal: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Dietary Preferences"
              value={formData.dietaryPreferences}
              onChange={(e) => setFormData({ ...formData, dietaryPreferences: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Allergy Information"
              value={formData.allergyInformation}
              onChange={(e) => setFormData({ ...formData, allergyInformation: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                Submit Request
            </button>
        </form>
    );
};

export default NutritionRequestForm;