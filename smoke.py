#!/usr/bin/env python3
import json, urllib.request, sys
def req(port,path,body=None,method=None):
    request=urllib.request.Request(f'http://localhost:{port}{path}',data=json.dumps(body).encode() if body is not None else None,method=method,headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(request,timeout=180) as response:
        data=response.read();return json.loads(data) if data else None

p=req(8083,'/products',{'name':'Smoke Screen','price':250,'quantity':3,'selected':False})
assert req(8083,'/products/'+str(p['id'])+'/selection',{},'PATCH')['selected'] is True
req(8083,'/products/'+str(p['id']),method='DELETE')
print('PASS: HTTP create, selection and delete')
