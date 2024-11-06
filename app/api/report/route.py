from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import csv
from io import StringIO
from datetime import datetime

class ReportHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Create CSV report
        output = StringIO()
        writer = csv.writer(output)
        
        # Write headers
        writer.writerow(['Annual Financial Report', datetime.now().strftime('%Y-%m-%d')])
        writer.writerow([])
        
        # Business details
        writer.writerow(['Business Details'])
        writer.writerow(['Business Name', data['businessDetails'].get('businessName', '')])
        writer.writerow(['Business Type', data['businessDetails'].get('businessType', '')])
        writer.writerow([])
        
        # Financial summary
        writer.writerow(['Financial Summary'])
        writer.writerow(['Total Income', f"${data['totalIncome']:,.2f}"])
        writer.writerow(['Total Expenses', f"${data['totalExpenses']:,.2f}"])
        writer.writerow(['Net Income', f"${data['netIncome']:,.2f}"])
        writer.writerow(['Estimated Tax', f"${data['estimatedTax']:,.2f}"])

        # Set response headers
        self.send_response(200)
        self.send_header('Content-Type', 'text/csv')
        self.send_header('Content-Disposition', 'attachment; filename=financial_report.csv')
        self.end_headers()

        # Send CSV data
        self.wfile.write(output.getvalue().encode())

def run(server_class=HTTPServer, handler_class=ReportHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()