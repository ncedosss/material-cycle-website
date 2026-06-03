import PortalLayout from "../layouts/PortalLayout";
export default function DashboardPage() {
  return (
    <PortalLayout
      title="Dashboard"
      subtitle="Monitor manifests, certificates, invoices and waste management activities."
    >
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="text-green-600 font-semibold uppercase tracking-widest mb-3">
            Welcome Back
          </div>

          <h1 className="text-5xl font-black mb-3">
            Dashboard
          </h1>

          <p className="text-gray-600 text-lg">
            Monitor waste management activities,
            manifests, certificates and invoices.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100">
            <div className="text-green-600 text-sm uppercase tracking-widest mb-2">
              Active
            </div>

            <div className="text-5xl font-black">
              12
            </div>

            <div className="text-gray-500 mt-2">
              Active Manifests
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100">
            <div className="text-green-600 text-sm uppercase tracking-widest mb-2">
              Issued
            </div>

            <div className="text-5xl font-black">
              48
            </div>

            <div className="text-gray-500 mt-2">
              Certificates
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100">
            <div className="text-green-600 text-sm uppercase tracking-widest mb-2">
              Outstanding
            </div>

            <div className="text-5xl font-black">
              4
            </div>

            <div className="text-gray-500 mt-2">
              Invoices
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100">
            <div className="text-green-600 text-sm uppercase tracking-widest mb-2">
              Diverted
            </div>

            <div className="text-5xl font-black">
              92%
            </div>

            <div className="text-gray-500 mt-2">
              Waste Diversion
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          <button
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              rounded-[32px]
              p-8
              text-left
              transition-all
              shadow-xl
            "
          >
            <div className="text-2xl font-black mb-2">
              Create Manifest
            </div>

            <div className="text-green-100">
              Start a new waste manifest.
            </div>
          </button>

          <button
            className="
              bg-white
              hover:shadow-xl
              border
              border-gray-100
              rounded-[32px]
              p-8
              text-left
              transition-all
            "
          >
            <div className="text-2xl font-black mb-2">
              View Certificates
            </div>

            <div className="text-gray-500">
              Download and review certificates.
            </div>
          </button>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[32px] shadow-lg border border-gray-100 p-8">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <div className="font-semibold">
                  Manifest MC-0001 Submitted
                </div>

                <div className="text-gray-500 text-sm">
                  14 June 2026
                </div>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Submitted
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <div className="font-semibold">
                  Disposal Certificate Issued
                </div>

                <div className="text-gray-500 text-sm">
                  12 June 2026
                </div>
              </div>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Issued
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">
                  Invoice INV-2026-004 Generated
                </div>

                <div className="text-gray-500 text-sm">
                  10 June 2026
                </div>
              </div>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                Outstanding
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
    </PortalLayout>
  );
}