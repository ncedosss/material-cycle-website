import PortalLayout from "../layouts/PortalLayout";

export default function ManifestsPage() {
  return (
    <PortalLayout
      title="Waste Manifests"
      subtitle="Manage and track waste manifests."
    >
      <div className="bg-white rounded-[32px] shadow-lg border border-gray-100 p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">
            Manifests
          </h2>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold">
            Create Manifest
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4">Manifest #</th>
                <th className="text-left py-4">Date</th>
                <th className="text-left py-4">Status</th>
                <th className="text-left py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-4">MC-0001</td>
                <td>2026-06-14</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    Submitted
                  </span>
                </td>
                <td>
                  View
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </PortalLayout>
  );
}